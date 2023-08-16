/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignInForm } from './dtos/user-sign-in.form';
import { ErrorCodes } from 'src/shared/enums/error-codes.enum';
import UserSignUpForm from './dtos/user-sign-up.form';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService : AuthService){};

  @Post('sign-in')
  async signIn(@Body() body : UserSignInForm){
    const dto = UserSignInForm.from(body);
    const errors = await UserSignInForm.validate(dto);

    if(errors){
        throw new BadRequestException({message: ErrorCodes.InvalidForm, errors})
    }

    return await this.authService.signIn(dto);
  }

  @Post("sign-up")
  async signUp(@Body() body: UserSignUpForm) {
    const dto = UserSignUpForm.from(body);
    const errors = await UserSignUpForm.validate(dto);
    if (errors) {
      throw new BadRequestException({ message: ErrorCodes.InvalidForm, errors });
    }

    return await this.authService.signUp(dto);
  }
}
