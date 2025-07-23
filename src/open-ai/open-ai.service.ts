import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Cuestionario } from 'src/quizzes/interface';
import type { flashcard, flashcardInput } from '../flashcards/Dtos';
@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Usa tu .env
    });
  }

  async generateQuizz(typeOptions: string[], quantity: number, focusing: string, documentText: string): Promise<Cuestionario> {
    type FocusingKey = 'conceptos' | 'generalidades' | 'especificos' | 'variados';

    const focusingDescriptions: Record<FocusingKey, string> = {
      "conceptos": "Concéntrate en los conceptos clave del tema. Las preguntas deben abordar definiciones, principios o ideas fundamentales.",
      "generalidades": "Enfócate en aspectos generales del tema, como contexto, historia, propósito o resumen general.",
      "especificos": "Crea preguntas que se centren en detalles puntuales, datos precisos o afirmaciones concretas del texto.",
      "variados": "Incluye una mezcla equilibrada de preguntas sobre conceptos, generalidades y detalles muy específicos del tema."
    };
    const description = focusingDescriptions[focusing as FocusingKey];
    const prompt = `
      Se te proporcionará un texto a continuación. Tu tarea es generar preguntas de tipo *quiz* basadas exclusivamente en el contenido del texto.

      Debes seguir estrictamente estos parámetros:

      - Tipos de pregunta permitidos: ${typeOptions.join(", ")}
      - Cantidad total de preguntas: ${quantity}
      - Enfoque: ${description}

      Por cada pregunta, genera un objeto con la siguiente estructura JSON:

      {
        "descripcion": "Este conjunto de preguntas evalúa el conocimiento sobre el tema X, abordando conceptos 
        clave, comprensión de ideas principales y razonamiento lógico basado en el documento original.",
        "preguntas": [
          {
            "pregunta": "Texto de la pregunta",
            "tipo": "selección multiple | verdadero y falso",
            "opciones": [ 
              "A. texto",
              "B. texto",
              "C. texto",
              "D. texto"
            ],// Solo incluir si el tipo es 'selección multiple'
            "respuesta_correcta": "Texto de la respuesta correcta",
            "explicacion": "Explicación breve basada en el documento original"
          },
          {
            "pregunta": "Texto de otra pregunta",
            "tipo": "verdadero y falso",
            "respuesta_correcta": "Verdadero",
            "explicacion": "Explicación breve basada en el documento original"
          }
        ]
      }

      ⚠️ Importante:
      - Si el tipo de pregunta es "verdadero y falso", omite el campo "opciones" y usa "respuesta_correcta": "Verdadero" o "Falso".
      - Usa únicamente la información contenida en el texto proporcionado. No agregues conocimiento externo.
      - Asegúrate de que las preguntas sean variadas y cubran bien el enfoque especificado.

      📄 Texto fuente:
      """
      ${documentText}
      """

      Por favor, devuelve un solo objeto JSON con el campo "descripcion" y el array "preguntas" con exactamente ${quantity} preguntas.
      `;

    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    try {
      const content = chatCompletion.choices[0]?.message?.content;
      if (!content) throw new Error('Respuesta vacía de OpenAI');
      return JSON.parse(content) as Cuestionario;
    } catch (error) {
      console.error('Error al parsear respuesta de OpenAI:', error);
      throw new Error('No se pudo generar el cuestionario.');
    }

  }

  async generateFlashcards(input: flashcardInput): Promise<flashcard[]> {
    const prompt = `
      Genera ${input.quantity} tarjetas de estudio (flashcards) sobre el siguiente texto:

      Texto: ${input.documentText}

      Cada tarjeta debe contener:
      - Una preguntas o conceptos clave en el anverso.
      - Una respuesta o explicación detallada en el reverso.

      Formato de salida:
      [
        {
          "question": "Pregunta o concepto clave",
          "answer": "Respuesta o explicación detallada"
        },
        ...
      ]

      Asegúrate de que las preguntas sean claras y las respuestas precisas, basadas en el texto proporcionado.
    `;

    const chatCompletion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) throw new Error('Respuesta vacía de OpenAI');
    return JSON.parse(content);
  }

}
