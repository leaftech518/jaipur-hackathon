exports.createDonor = async (req, res) => {
    const {
      owner_name,
      owner_number,
      city,
      state,
      goodwillpoints,
      org_name,
      org_add,
      org_type,
    } = req.body;
  
    const donor = await Donor.create({
      owner_name,
      owner_number,
      city,
      state,
      goodwillpoints,
      donation_center: {
        org_name,
        org_add,
        org_type,
      },
    });
    if (!donor) {
      return res.send({
        status: false,
        message:
          "something went wrong in creating donor. Please try after sometime.",
      });
    }
  
    res.send({
      status: true,
      message: "All set for the donor.",
      donor,
    });
  };