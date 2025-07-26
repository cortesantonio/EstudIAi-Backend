export interface flashcardInput {
    quantity: number;
    documentText?: string;
    studyGroupId: number;
}
export interface flashcard {
    id?: number;
    studyGroupId?: number;
    question: string;
    answer: string;

}