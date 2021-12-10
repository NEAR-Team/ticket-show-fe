import { apiHandler } from "../../services/api.handler";
import { addCompany, getCompanies } from "../../services/company.service";

/**
 * /api/companies
 * /api/companies?owner_id=<owner_id>
 * /api/companies?owner_id=<owner_id>&id=<company_id>
 */
const handleGet = async (req, res) => {
  const condition = req.query;
  const data = await getCompanies(condition);
  return res.json(data);
};

/**
 * /api/companies
 * { id, owner_id, meta_data }
 * **/
const handlePost = async (req, res) => {
  const company = await addCompany(req.body);
  return res.json(company);
};

export default apiHandler({
  get: handleGet,
  post: handlePost,
});
