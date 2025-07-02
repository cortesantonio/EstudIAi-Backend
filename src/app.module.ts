import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudyGroupModule } from './study-group/study-group.module';
import { UserModule } from './user/user.module';
import { GroupMemberModule } from './group-member/group-member.module';

@Module({
  imports: [StudyGroupModule, UserModule, GroupMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
