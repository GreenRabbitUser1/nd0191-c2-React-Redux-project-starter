import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPoll } from "../actions/polls";

const NewPoll = (props) => {

    const {user, dispatch} = props;

    const [submitting, setSubmitting] = useState(false);
    const [submitText, setSubmitText] = useState('Submitting ...');
    const [pollOption1, setPollOption1] = useState('');
    const [pollOption2, setPollOption2] = useState('');

    let navigate = useNavigate();

    const submitNewPoll = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log('User is submitting a new poll');
        let poll_details =  {
            optionOneText: pollOption1,
            optionTwoText: pollOption2,
            author: user.id
        }
        console.log('Poll Details', poll_details);

        await dispatch(addPoll(poll_details));

        setSubmitText('Submitted!');

        setTimeout(() => {
            // setSubmitting(false);
            navigate('/');
        }, 500);
        
    };

    const handleUpdatePollOption1 = (e) => {
        setPollOption1(e.target.value);
    }
    const handleUpdatePollOption2 = (e) => {
        setPollOption2(e.target.value);
    }

    return (
        <div data-testid="add-poll-form-wrap">
            <form className="add-poll-form" onSubmit={submitNewPoll}>

                <div className="form-top">
                    <label>
                        Would you rather ... ?
                    </label>
                </div>

                <div className="form-bottom">
                    <div>
                        <label>
                            Option #1
                        </label>
                        <textarea placeholder="Enter text ..." onChange={handleUpdatePollOption1} value={pollOption1} />
                    </div>
                    <div>
                        <label>
                            Option #2
                        </label>
                        <textarea placeholder="Enter text ..." onChange={handleUpdatePollOption2} value={pollOption2} />
                    </div>
                </div>

                {
                    !submitting &&
                    <button className="submit-button">
                        Submit New Poll
                    </button>
                }
                {
                    submitting &&
                    <div className="submit-button">
                        {submitText}
                    </div>
                }
                

            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(NewPoll);