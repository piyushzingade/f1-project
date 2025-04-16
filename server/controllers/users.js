import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user." });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found." });

    const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)));
    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => (
      { _id, firstName, lastName, occupation, location, picturePath }
    ));

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error fetching friends:", err);
    res.status(500).json({ error: "Failed to fetch friends." });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: "User or friend not found." });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((userId) => userId !== friendId);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(user.friends.map((friendId) => User.findById(friendId)));
    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => (
      { _id, firstName, lastName, occupation, location, picturePath }
    ));

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error updating friends:", err);
    res.status(500).json({ error: "Failed to update friends." });
  }
};
