import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export const ESTADOS_EQUIPO = ['Disponible', 'En uso', 'Mantención', 'Baja'];

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty({ message: 'El código de inventario es obligatorio' })
  @MinLength(3, { message: 'El código de inventario debe tener al menos 3 caracteres' })
  codigoInventario: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  tipo: string;

  @IsString()
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marca: string;

  @IsString()
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @IsString()
  @IsNotEmpty({ message: 'La ubicación es obligatoria' })
  ubicacion: string;

  @IsIn(ESTADOS_EQUIPO, {
    message: 'El estado debe ser Disponible, En uso, Mantención o Baja',
  })
  estado: string;

  @IsDateString(
    { strict: true },
    { message: 'La fecha de adquisición debe ser una fecha válida (AAAA-MM-DD)' },
  )
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}