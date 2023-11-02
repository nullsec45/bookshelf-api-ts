import { IsString, IsDateString, IsBoolean } from "class-validator";

export class CreateBookshelfDto {
    @IsString()
    Judul: string;

    @IsString()
    Penulis: string;

    @IsDateString()
    TanggalTerbit: Date;

    @IsBoolean()
    IsCompleted: Boolean;
}
