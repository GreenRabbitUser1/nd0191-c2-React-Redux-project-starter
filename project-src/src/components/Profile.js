import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { saveUser } from "../actions/users";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {

    const {user, dispatch} = props;

    let navigate = useNavigate();

    const [_avatarURL, setAvatarURL] = useState('');
    const [_name, setName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitText, setSubmitText] = useState('Submitting ...');

    const updateProfile = async (e) => {
        //  User clicked "Submit Changes" button
        //  Update the following on the user profile
            //  AvatarURL
            //  Name
        e.preventDefault();
        setSubmitting(true);
        await dispatch(saveUser(user, {
            avatarURL: _avatarURL,
            name: _name
        }));

        setSubmitText('Submitted!');

        setTimeout(() => {
            navigate('/');
        }, 500);
    }

    const handleUpdateAvatarURL = (e) => {
        setAvatarURL(e.target.value);
    }

    const handleUpdateName = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        if (user){
            setAvatarURL(user.avatarURL ? user.avatarURL : '');
            setName(user.name ? user.name : '');
        }
    }, [user])

    return (
        <form className="profile-wrap" onSubmit={updateProfile}>
            <div className="main-info-wrap">
                <div className="field-wrap">
                    <img src={_avatarURL ? _avatarURL : null} />
                    <label>Avatar URL</label>
                    <input type="text" className="field-input" value={_avatarURL} onChange={handleUpdateAvatarURL} />
                </div>

                <div className="field-wrap">
                    <label>Name</label>
                    <input type="text" className="field-input" value={_name} onChange={handleUpdateName} />
                </div>

            </div>

            {
                !submitting &&
                <button className="submit-button mt-2">
                    Submit Changes
                </button>
            }
            {
                submitting &&
                <div className="submit-button mt-2">
                    {submitText}
                </div>
            }
            
        </form>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile);