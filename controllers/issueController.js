const createIssue = (req, res) => {
res.send("Issue created!");
};

const updateIssuedById = (req, res) =>{
    res.send("Issue Updated!");
};

const deleteIssuedById = (req, res) => {
    res.send('Issue Delete!');
};

const getAllIssues = (req, res) => {
    res.send("All Issues Fetched!");
};

const getIssueById = (req, res) => {
    res.send('Issues Details Fetched!');
};

module.exports = {
    createIssue,
    updateIssuedById,
    deleteIssuedById,
    getAllIssues,
    getIssueById,
}