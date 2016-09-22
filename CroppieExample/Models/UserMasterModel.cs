using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CroppieExample.Models
{
    public class UserMasterModel
    {
        public UserMasterModel()
        {
            lstyear = new List<int>();
        }

        public string _id { get; set; }



        public string PhoneNo { get; set; }
        public bool IsPhoneDisplay { get; set; }

        public int Month { get; set; }
        public int Day { get; set; }
        public int Year { get; set; }
        public List<int> lstyear
        {
            get { return Enumerable.Range(DateTime.Now.Year - 100, 101).OrderByDescending(x => x).ToList(); }
            set { }
        }

        public string Gender { get; set; }
        public string EmailId { get; set; }

        public string LastPassword { get; set; }
        public bool IsActive { get; set; }

        public string DisabledAccountReason { get; set; }

        public Nullable<bool> IsRoom { get; set; }   // NeetRoom , HaveRoom
        public bool IsShowPassword { get; set; }
        public bool IsNewUserMailSent { get; set; }
        public string ProfilePicturePath { get; set; }
        public string Aboutus { get; set; }

        public HttpPostedFileBase ProfilePicture { get; set; }

        public string ProfilePictureBase64 { get; set; }

        public string Oldpassword { get; set; }
        public string Newpassword { get; set; }

        public bool IsNewUserAdd { get; set; }
        public bool IsUserMessage { get; set; }
        public bool IsSiteNews { get; set; }

        public bool IsProfile50PerSent { get; set; }
        public bool Is21DaysInActiveSent { get; set; }
        public bool Is30DaysInActiveSent { get; set; }

        public string SocialType { get; set; }
        public string SocialId { get; set; }

        public int ProfileComplete { get; set; }

        public string UserId { get; set; }

        public DateTime Lastlogindate { get; set; }

        public bool EmailValidated { get; set; }

        public string GuidId { get; set; }

        public string Token { get; set; }
        public Nullable<bool> IsEmailSent { get; set; }

        public Nullable<DateTime> ExpireTime { get; set; }

        public bool IsCompleteSurvey { get; set; }
        public bool IsProfilePictureExist { get; set; }
    }
}