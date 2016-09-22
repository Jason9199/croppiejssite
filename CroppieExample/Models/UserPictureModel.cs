using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CroppieExample.Models
{
    public class UserPictureModel
    {
        public string _id { get; set; }
        public string UserId { get; set; }
        public string PicturePath { get; set; }
        public string Exts { get; set; }
        public string FileName { get; set; }
        public string PictureSize { get; set; }
    }
}