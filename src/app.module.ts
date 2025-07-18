import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyGroupModule } from './study-group/study-group.module';
import { UserModule } from './user/user.module';
import { GroupMemberModule } from './group-member/group-member.module';
import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { OpenAiModule } from './open-ai/open-ai.module';

@Module({
  imports: [StudyGroupModule, UserModule, GroupMemberModule, AuthModule, QuizzesModule, OpenAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
