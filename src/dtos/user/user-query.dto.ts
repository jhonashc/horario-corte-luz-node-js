import { PaginationDto } from "../shared/pagination.dto";

export interface GetUserSchedulesDto extends PaginationDto {
  name?: string;
}
