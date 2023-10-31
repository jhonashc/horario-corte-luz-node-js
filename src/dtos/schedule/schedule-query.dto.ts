import { PaginationDto } from "../shared/pagination.dto";

export interface GetSchedulesDto extends PaginationDto {
  city?: string;
  sector?: string;
}
