import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User as UserModel } from './models/user.model';
import { CreateUserInput } from './dto/createUser.input';
import { User } from '@prisma/client';
import { GetUserArgs } from './dto/getUser.args';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return await this.userService.getUser(getUserArgs.email);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.createUser(createUserInput);
  }
}
