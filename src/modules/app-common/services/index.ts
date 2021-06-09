import { AppCommonService } from './app-common.service';
import { PermissionsService } from './permissions.service';

export const services = [AppCommonService, PermissionsService];

export * from './app-common.service';
export * from './permissions.service';
