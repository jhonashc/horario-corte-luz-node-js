export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDto?] {
    if (isNaN(page) || isNaN(limit))
      return ["La página y el límite deben ser números"];

    if (page <= 0) return ["La página debe ser mayor que 0"];
    if (limit <= 0) return ["El límite debe ser mayor que 0"];

    return [undefined, new PaginationDto(page, limit)];
  }
}
