import { Prisma } from '@prisma/client';
import { prisma } from '../prismaClient';
import dependencies from "../dependencies";
import {BOARD_UPDATED_EVENT_NAME} from "@retro-tool/api-interfaces";

export class BoardRepository {
  findById(id: string) {
    return prisma.board.findFirst({
      where: { id },
      include: {
        columns: true,
      },
    });
  }

  async updateTimerState(id: string, state: Prisma.InputJsonValue) {
    const board = await prisma.board.update({
      where: { id },
      data: { timer: state as Prisma.InputJsonValue }
    })

    dependencies.namespaceService.sendEventToBoard(board.id, {
      type: BOARD_UPDATED_EVENT_NAME,
      payload: board,
    });

    return board;
  }

}
