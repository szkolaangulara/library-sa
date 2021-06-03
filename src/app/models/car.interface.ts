import {CarStatus} from '@app/enums/car.status.enum';

export interface Car {
    brand: string;
    model: string;
    price: number;
    pricePerDay?: number;
    status?: CarStatus;
    date: string;
    photoSource: string;
}
