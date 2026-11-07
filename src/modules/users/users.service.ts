import {
  Injectable,
  NotFoundException,
  ConflictException,
  OnModuleInit,
  Logger,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "../../common/enums/role.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const testEmail =
      this.configService.get<string>("TEST_USER_EMAIL") || "admin@example.com";
    const testPassword =
      this.configService.get<string>("TEST_USER_PASSWORD") || "Password123!";
    const testName =
      this.configService.get<string>("TEST_USER_NAME") || "Test Admin";

    try {
      const existingUser = await this.userModel.findOne({ email: testEmail }).exec();
      if (!existingUser) {
        const testUser = new this.userModel({
          name: testName,
          email: testEmail,
          password: testPassword,
          role: Role.ADMIN,
          isVerified: true,
        });
        await testUser.save();
        this.logger.log(`Default test user created: ${testEmail}`);
      }
    } catch (error) {
      this.logger.warn(`Could not seed test user on startup: ${error.message}`);
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async updateHashedRefreshToken(id: string, hashedRefreshToken: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { hashedRefreshToken }).exec();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    user.isDeleted = true;
    await user.save();
  }
}
