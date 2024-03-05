/**
 * Only tracks the properties that Camperbot actually needs.
 */
export interface UserRecord {
  email: string;
  isDonating?: boolean;
  isRespWebDesignCert?: boolean;
  is2018DataVisCert?: boolean;
  isFrontEndLibsCert?: boolean;
  isJsAlgoDataStructCert?: boolean;
  isApisMicroservicesCert?: boolean;
  isInfosecQaCert?: boolean;
  isQaCertV7?: boolean;
  isInfosecCertV7?: boolean;
  is2018FullStackCert?: boolean;
  isFrontEndCert?: boolean;
  isBackEndCert?: boolean;
  isDataVisCert?: boolean;
  isFullStackCert?: boolean;
  isSciCompPyCertV7?: boolean;
  isDataAnalysisPyCertV7?: boolean;
  isMachineLearningPyCertV7?: boolean;
  isRelationalDatabaseCertV8?: boolean;
  isCollegeAlgebraPyCertV8?: boolean;
  isFoundationalCSharpCertV8?: boolean;
  isJsAlgoDataStructCertV8?: boolean;
}
