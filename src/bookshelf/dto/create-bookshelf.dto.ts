import { IsString, IsDateString, IsBoolean, IsNotEmpty, IsISO8601, IsOptional } from "class-validator";

export class CreateBookshelfDto {
    @IsString()
    @IsNotEmpty()
    Judul: string;

    @IsString()
    @IsNotEmpty()
    Penulis: string;

    // @IsDateString()
    @IsNotEmpty()
    TanggalTerbit: Date;

    @IsBoolean()
    @IsNotEmpty()
    IsCompleted: Boolean;

    @IsOptional()
    HalamanTerakhir?: number;

}
