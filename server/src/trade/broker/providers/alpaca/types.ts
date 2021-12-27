import { AccountInfo } from "../../../../types";

export interface AlpacaAccountInfo extends AccountInfo {
    pattern_day_trader: boolean,
}