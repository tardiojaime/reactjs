import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle, center }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color='black'
        fontWeight="bold"        
        sx={{ m: "0 0 5px 0", textAlign: `${center}`}}
      >
        {title}
      </Typography>
      {
      !subtitle ? null :
      <Typography variant="h5" color='green'>
        {subtitle}
      </Typography>
      }
    </Box>
  );
};

export default Header;
