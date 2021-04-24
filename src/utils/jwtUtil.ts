import jwt_decode from 'jwt-decode';

/**
 * JWTトークンからcognitoユーザプールに設定されたユーザの所属グループを取得する
 *
 * @param {string} jwtToken cognito jwtToken
 * @returns {string[]}
 */
export const getCognitoUserGroups = (jwtToken: string): string[] => {
  // eslint-disable-next-line
  const tokenInfo = jwt_decode<any>(jwtToken);
  return tokenInfo['custom:organization_name'];
};
