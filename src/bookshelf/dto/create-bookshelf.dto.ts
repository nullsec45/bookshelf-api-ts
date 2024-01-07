import { IsString, IsDateString, IsBoolean, IsNotEmpty, IsISO8601, IsOptional, IsNumber } from "class-validator";

export class CreateBookshelfDto {
    user_id: number;

    @IsString()
    @IsNotEmpty()
    judul: string;

    @IsString()
    @IsNotEmpty()
    penulis: string;

    // @IsDateString()
    @IsNotEmpty()
    tanggal_terbit: Date;

    @IsBoolean()
    @IsNotEmpty()
    is_completed: Boolean;

    @IsOptional()
    halaman_terakhir?: number;

}
