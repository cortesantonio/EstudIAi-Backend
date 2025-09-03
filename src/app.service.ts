import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return (
      '🚀 ¡Bienvenido a tu aplicación NestJS! 🎉\n\n' +
      '✨ Esta es una API potente construida con:\n' +
      '   • NestJS - Framework robusto para Node.js\n' +
      '   • Prisma - ORM moderno y type-safe\n' +
      '   • TypeScript - Tipado estático para mayor seguridad\n\n' +
      '🎯 Funcionalidades disponibles:\n' +
      '   • Sistema de autenticación JWT\n' +
      '   • Gestión de usuarios y grupos de estudio\n' +
      '   • Sistema de documentos y flashcards\n' +
      '   • Quizzes interactivos\n' +
      '   • Integración con OpenAI\n\n' +
      '🔥 ¡Comienza a explorar las maravillas de tu aplicación! 🔥'
    );
  }
}
