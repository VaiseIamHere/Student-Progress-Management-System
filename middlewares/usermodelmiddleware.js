import { fetchUserData } from "../datasync/userdatasync.js"

export const updateUserData = async function (next) {
    try {
        if (this.cfHandle) {
            const data = await fetchUserData(this.cfHandle);

            this.currentRating = data.rating;
            this.maxRating = data.maxRating;
            this.currentRank = data.rank;
            this.maxRank = data.maxRank;
        }

        next();
    }
    catch(err) {
        next(err);
    }
}
