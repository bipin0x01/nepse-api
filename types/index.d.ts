import { SecurityBrief } from "./securityBrief";
import { SecurityDetail } from "./securityDetail";
import { MarketStatus } from "./marketStatus";
declare function GetMarketStatus(): Promise<MarketStatus | null>;
declare function GetSecurityBriefs(): Promise<SecurityBrief[]>;
declare function UpdateSecurityBriefs(): Promise<void>;
declare function GetSecurityDetail(symbol: string): Promise<SecurityDetail | null>;
export { UpdateSecurityBriefs, GetSecurityDetail, GetSecurityBriefs, GetMarketStatus };
