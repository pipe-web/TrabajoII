import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepo: Repository<Equipo>,
  ) {}

  findAll() {
    return this.equiposRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const equipo = await this.equiposRepo.findOneBy({ id });

    if (!equipo) {
      throw new NotFoundException(`Equipo con id ${id} no encontrado`);
    }

    return equipo;
  }

  async create(dto: CreateEquipoDto) {
    const equipo = this.equiposRepo.create(dto);
    return this.guardar(equipo);
  }

  async update(id: number, dto: UpdateEquipoDto) {
    const equipo = await this.findOne(id);
    Object.assign(equipo, dto);
    return this.guardar(equipo);
  }

  async remove(id: number) {
    const equipo = await this.findOne(id);
    await this.equiposRepo.remove(equipo);

    return { mensaje: 'Equipo eliminado correctamente', id };
  }

  private async guardar(equipo: Equipo) {
    try {
      return await this.equiposRepo.save(equipo);
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Ya existe un equipo con ese código de inventario',
        );
      }
      throw error;
    }
  }
}