import { Terms } from '@ee/licensing/types';
import { readFileSync } from 'fs';
import { publicDecrypt } from 'crypto';
import { resolve } from 'path';

export enum LICENSE_FIELD {
  IS_EXPIRED = 'expired',
  APP_COUNT = 'appCount',
  TOTAL_USERS = 'usersCount',
  EDITORS = 'editorsCount',
  VIEWERS = 'viewersCount',
  OIDC = 'oidcEnabled',
  AUDIT_LOGS = 'auditLogsEnabled',
  UPDATED_AT = 'updatedAt',
  ALL = 'all',
  USER = 'allUsers',
  VALID = 'valid',
  WORKSPACES = 'workspaces',
  FEATURES = 'features',
  DOMAINS = 'domains',
  STATUS = 'status',
}

export enum LICENSE_LIMITS_LABEL {
  //Users
  USERS = 'Total Users',
  SUPERADMINS = 'Superadmins',
  EDIT_USERS = 'Builders',
  END_USERS = 'End Users',
  SUPERADMIN_USERS = 'Super Admins',

  //Apps
  APPS = 'Apps',

  //Workspaces
  WORKSPACES = 'Workspaces',
}

export enum LICENSE_TYPE {
  BASIC = 'basic',
  TRIAL = 'trial',
  ENTERPRISE = 'enterprise',
  BUSINESS = 'business',
}

export enum LICENSE_LIMIT {
  UNLIMITED = 'UNLIMITED',
}

export function decrypt(toDecrypt: string): Terms {
  const absolutePath = resolve('keys/public.pem');
  const publicKey = readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = publicDecrypt(publicKey, buffer);
  return JSON.parse(decrypted.toString('utf8'));
}
