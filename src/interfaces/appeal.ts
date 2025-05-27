/* eslint-disable @typescript-eslint/naming-convention -- This is what we get.*/
export interface Appeal {
  table_id:     number;
  database_id:  number;
  workspace_id: number;
  event_id:     string;
  event_type:   string;
  items: Array<
    {
      "id":              number;
      "order":           string;
      "User ID":         string;
      "Username":        string;
      "Code of Conduct": boolean;
      "Reason":          string;
      "Fair":            string;
      "Improve":         string;
      "Email":           string;
    }
  >;
}
