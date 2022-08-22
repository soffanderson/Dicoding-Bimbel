import React from "react";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      sisa: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const limit = 50;
    const titleLimit = event.target.value.slice(0, limit);
    const sisaTitle = titleLimit.length;

    this.setState(() => {
      return {
        title: titleLimit,
        sisa: limit - sisaTitle,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    this.props.addNote(this.state);
    event.preventDefault();
  }

  render() {
    const sisaTampil = this.state.sisa;
    const sisaHabis = sisaTampil === 0 ? "habis" : sisaTampil;
    let button;

    if (sisaTampil !== 50) {
      button = (
        <div className="badge">
          Sisa Karakter:
          <span className="badge bg-danger mx-1">{sisaHabis}</span>
        </div>
      );
    } else {
      button = null;
    }

    return (
      <>
        <span class="anchor" id="buat"></span>
        <div className="col-md-6">
          <div className="col p-3">
            <h2 className="text-center">Tambah Catatan</h2>
          </div>
          <div className="col mb-3">
            <form onSubmit={this.onSubmitEventHandler}>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Judul
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="name@example.com"
                  value={this.state.title}
                  onChange={this.onTitleChangeEventHandler}
                  required
                />
                {button}
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Catatan
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={this.state.body}
                  onChange={this.onBodyChangeEventHandler}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Tambah
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default NotesInput;
