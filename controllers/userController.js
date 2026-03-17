const  getAllUsers = (req,res) => {
    res.send("All Users fetched!");
};

const signUp = (req, res) => {
    res.send("user signed up!");
};

const login = (req, res) => {
    res.send("logging in!");
};


const  getUsersProfile= (req,res) => {
    res.send("Profile fetched!");
};

const  updateUsersProfile = (req,res) => {
    res.send("Profile updated!");
};

const  deleteUsersProfile = (req,res) => {
    res.send("Profile deleted!");
};

module.exports = {
    getAllUsers,
    signUp,
    login,
    getUsersProfile,
    updateUsersProfile,
    deleteUsersProfile,

}

/*
DB se data fetch karega

Validation karega

Business logic handle karega*/