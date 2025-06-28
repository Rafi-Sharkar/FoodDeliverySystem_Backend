import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class OptionalParseBoolPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined || value === null || value === ''){
            return undefined
        }

        if (value === 'true' || value === 'yes' || value === "1") return true
        if (value === 'false' || value === 'no' || value === "0") return false

        throw new BadRequestException(`Validation failed: '${value}' is not a boolean`)
    }
}