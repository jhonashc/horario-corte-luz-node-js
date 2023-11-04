import { Schedule } from "@prisma/client";

export interface UpdateSchedulesDto {
  schedules: Schedule[];
}
