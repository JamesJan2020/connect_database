import React, { Component } from 'react';
import style from './App.module.css'
import Axios from 'axios'
class App extends Component {

  state = {
    movieName: '',
    review: '',
    newReview: '',
    movieReviewList: [],
  };

  componentDidMount() {
    Axios.get('http://localhost:3001/api/get')
      .then(rs => {
        this.setState({
          movieReviewList: rs.data
        });
      });
  };
  onchangeMovieName = e => {
    this.setState({
      movieName: e.target.value
    });

  };
  onchangeMovieReview = e => {
    this.setState({
      review: e.target.value
    });

  };

  onchangeNewReview = e => {
    this.setState({
      newReview: e.target.value
    });
  }


  submitReview = () => {
    const { movieName, review, movieReviewList } = this.state
    if (movieName.trim() === '' && review.trim() === '') {
      alert('別忘了寫下妳愛的電影名稱和評論哦!')
      return
    } else if (review.trim() === '') {
      alert('評論也都忘囉!(必填)')
      return
    }
    Axios.post('http://localhost:3001/api/insert',
      {
        movieName: movieName,
        movieReview: review,
      }).then(
        this.setState({
          movieReviewList: [...movieReviewList, { movieName: movieName, movieReview: review }],
          movieName: '',
          review: '',
        })).then(
          window.location.reload()
        );
  };

  deleteReview = (mid) => {
    if (window.confirm("確認刪除評論嗎??")) {
      Axios.delete(`http://localhost:3001/api/delete/${mid}`)
        .then(
          window.location.reload()
        )
    } else {
      return
    }
  }
  updateReview = (mid) => {
    const { movieName, newReview } = this.state
    if (newReview.trim() === '') return
    Axios.put(`http://localhost:3001/api/update/${mid}`, {
      movieName: movieName,
      movieReview: newReview,
    }).then(
      this.setState({
        newReview: ''
      })).then(
        window.location.reload()
      )
  }

  render() {
    const { movieName, review, movieReviewList } = this.state
    return (
      <div className={style.App}>
        <h1>電影評論</h1>
        <div className={style.form}>
          <label>電影名稱:</label>
          <input type="text" name="movieName" value={movieName} onChange={this.onchangeMovieName} />
          <label>評論:</label>
          <textarea rows="4" cols="50" name="review" value={review} onChange={this.onchangeMovieReview} />
          <button className={style.chkBtn} onClick={this.submitReview}>新增評論</button>
          <div className={style.wrap}>
            {movieReviewList.map((val, index) => {
              return <div className={style.card} key={index}>
                <h1>{val.movieName}</h1>
                <p> {val.movieReview}</p>
                <label>更新評論</label>
                <input className={style.updateInput} type="text" onChange={this.onchangeNewReview} />
                <div className={style.reviewBtn}>
                  <button onClick={() => { this.deleteReview(val.mid) }}>刪除評論</button>
                  <button onClick={() => { this.updateReview(val.mid) }}>更新評論</button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
