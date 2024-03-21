const { get_query_database } = require("../../config/database_utlis");

exports.get_resource = async(req, res)=>{
    const role = req.body.role;
    if(!role){
        return res.status(400).json({
            err:"role is required(jwt provides it)"
        })
    }
    try {
        const query = `SELECT mr.id, mr.name, mr.path, mr.icon 
        FROM roles_resources_mapping rrm 
        INNER JOIN master_resources mr ON  rrm.resource_id = mr.id
        WHERE rrm.role_id = ?`
        const resource = await get_query_database(query, [role])
        res.status(200).json(resource)
    } catch (err) {
        console.error("Error fetching resource: ", err)
        res.status(500).json({
            err:"Error fetching resourse"
        })
    }
}