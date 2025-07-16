import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyGroupModule } from './study-group/study-group.module';
import { UserModule } from './user/user.module';
import { GroupMemberModule } from './group-member/group-member.module';
import { AuthModule } from './auth/auth.module';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [StudyGroupModule, UserModule, GroupMemberModule, AuthModule, QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
