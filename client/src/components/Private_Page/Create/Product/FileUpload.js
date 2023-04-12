import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { Avatar, Badge } from "antd";
import "../../PrivatePage.css";

const FileUpload = ({ value, setValue, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleRemove = (public_id) => {
    setLoading(true);
    // public_id.preventDefault();
    // console.log(public_id);
    const { images } = value;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValue({ ...value, images: filterImages });
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = value.images; //[]
      //console.log(files)
      for (let i = 0; i < files.length; i++)
        //console.log(files[i])
        Resize.imageFileResizer(
          files[i],
          835,
          419,
          "JPG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  images: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                console.log(res);
                allfileUpload.push(res.data);
                console.log("file then: ", allfileUpload);
                setValue({ ...value, images: allfileUpload });
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
            //console.log(uri)
          },
          "base64"
        );
    }
    // else{
    //   setLoading(false)
    // }
  };
  // console.log(loading);

  return (
    <div>
      <div className="form-group mt-3">
        {loading ? (
          <>
            <label htmlFor="" className="form-label">
              กำลังโหลด...
            </label>
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </>
        ) : (
          <label htmlFor="" className="form-label">
            เลือกรูปภาพ
          </label>
        )}

        <input
          type="file"
          name="file"
          multiple
          accept="images/*"
          className="form-control"
          onChange={handleChange}
        />

        <div className="mt-3 row">
          {value.images &&
            value.images.map((item,index) => (
              // <div className="imagesShow "></div>
              <div className="card col-md-4 p-2" key={index}>
                <img src={item.url} />

                <div className="d-grid">
                  <button
                  type="button"
                    onClick={() => handleRemove(item.public_id)}
                    className="btn text-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
