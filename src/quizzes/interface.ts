export interface CreateSessionInterface {
    title: string,
    description: string,
    duration: number,
    studyGroupId: number
}

type TipoPregunta = 'selección multiple' | 'verdadero y falso';

export interface Pregunta {
  pregunta: string;
  tipo: TipoPregunta;
  opciones?: string[]; // Solo presente si tipo === 'selección multiple'
  respuesta_correcta: string;
  explicacion: string;
}

export interface Cuestionario {
  descripcion: string;
  preguntas: Pregunta[];
}
