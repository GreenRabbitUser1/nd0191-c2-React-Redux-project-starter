import { connect } from "react-redux";
import { useState } from "react";

const NewPoll = () => {

    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOption1, setPollOption1] = useState('');
    const [pollOption2, setPollOption2] = useState('');

    const submitNewPoll = (e) => {
        e.preventDefault();
        console.log('User is submitting a new poll');
        console.log('Poll Details', {
            pollQuestion,
            pollOption1,
            pollOption2
        });
    };

    const handleUpdatePollQuestion = (e) => {
        setPollQuestion(e.target.value);
    }

    const handleUpdatePollOption1 = (e) => {
        setPollOption1(e.target.value);
    }
    const handleUpdatePollOption2 = (e) => {
        setPollOption2(e.target.value);
    }

    return (
        <div>
            <form className="add-poll-form" onSubmit={submitNewPoll}>

                <div className="form-top">
                    <label>
                        What question would you like to ask?
                    </label>
                    <textarea onChange={handleUpdatePollQuestion} value={pollQuestion} />
                </div>

                <div className="form-bottom">
                    <div>
                        <label>
                            Option #1
                        </label>
                        <textarea  onChange={handleUpdatePollOption1} value={pollOption1} />
                    </div>
                    <div>
                        <label>
                            Option #2
                        </label>
                        <textarea  onChange={handleUpdatePollOption2} value={pollOption2} />
                    </div>
                </div>

                <button className="submit-button">
                    Submit New Poll
                </button>

            </form>
        </div>
    )
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(NewPoll);