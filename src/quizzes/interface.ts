export interface CreateSessionInterface {
  title: string,
  description: string,
  duration: number,
  studyGroupId: number
}


export interface Pregunta {
  pregunta: string;
  tipo: string;
  opciones?: string[]; // Solo presente si tipo === 'selección multiple'
  respuesta_correcta: string;
  explicacion: string;
}

export interface Cuestionario {
  descripcion: string;
  preguntas: Pregunta[];
}


export interface GenerateQuizInput {
  focusing: string;
  quantity: number;
  title: string;
  typeOptions: string[];
  studyGroupId: number;
}


export interface Session {
  id: number;
  studyGroupId: number;
  title: string;
  description: string;
  duration: number;
  createdAt: Date;

}


export interface ResultadoDTO {
    sessionId: number,
    userId: number,
    score: number,
}