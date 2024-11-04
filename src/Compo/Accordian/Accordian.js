import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="container">
      <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-lg-6">
          <Accordion
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Financial Markets</Typography>
              <Typography sx={{ color: 'white' }}>Forex Trading</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              <div style={{
      backgroundColor: '#1c1c1e',
      color: '#f1f1f1',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#4CAF50' }}>📈 Join Our Forex Trading Community!</h2>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        I’m a <strong>Forex trader with 4 years of experience</strong>, and I've decided to share my knowledge by building a strong, supportive community for all students interested in trading markets.
      </p>
      <h3 style={{ color: '#4CAF50' }}>What We Offer:</h3>
      <ul style={{ listStyleType: 'none', padding: '0', textAlign: 'left' }}>
        <li>🤝 <strong>Community Support:</strong> Our members are here to answer questions and share their experiences to help you succeed in the markets.</li>
        <li>📊 <strong>Latest Trading Signals:</strong> Stay updated with real-time trading signals to make informed decisions.</li>
        <li>💬 <strong>Continuous Learning:</strong> From market analysis to trading tips, we’ll guide you on every step of your trading journey.</li>
      </ul>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Join us today to become part of a thriving community of traders, eager to learn, share, and grow together!
      </p>
    </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Web Development</Typography>
              <Typography sx={{ color: 'white' }}>MERN STACK.</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>

              <div style={{
      backgroundColor: '#2d2d2d',
      color: '#f1f1f1',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#D8C978' }}>🌐 Join Our Developer Community - For Web Developers, By Web Developers!</h2>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Are you passionate about web development and looking for a space to connect, collaborate, and grow with like-minded individuals? Look no further! 🚀 As a <strong>MERN Stack developer</strong> with extensive experience, I’ve built a vibrant community where developers of all levels come together to chat, share insights, and solve challenges.
      </p>
      <h3 style={{ color: '#D8C978' }}>Why Join?</h3>
      <ul style={{ listStyleType: 'none', padding: '0', textAlign: 'left' }}>
        <li>💬 <strong>Real-time Interaction:</strong> Engage in meaningful discussions, ask questions, and share your expertise in an open, supportive environment.</li>
        <li>🤝 <strong>Collaborate Freely:</strong> Connect with developers from around the globe, share your experiences, and learn from others—all in one place.</li>
        <li>💡 <strong>Absolutely Free!</strong> Yes, this community is 100% free—no hidden costs, no subscriptions. Just pure knowledge sharing and networking!</li>
      </ul>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Whether you're new to web development or an experienced coder, everyone is welcome. Dive in, make friends, and level up your skills. Let's build the future of web development together!
      </p>
    </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>TRADING BROKERAGE </Typography>
              <Typography sx={{ color: 'white' }}>
              </Typography>
              FTMO
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              
    <div style={{
      backgroundColor: '#1c1c1e',
      color: '#f1f1f1',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#4CAF50' }}>💼 Become a Professional Trader Without Initial Capital</h2>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Don’t have your own capital to start trading? No problem! Our community offers <strong>complete guidance</strong> to help you become a professional trader.
      </p>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        We’ll support you through the process of taking tests for top trading brokerage firms, with potential funding opportunities up to <strong>$200,000</strong>.
      </p>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        From understanding each phase to evaluating the advantages and disadvantages, we’re here to guide you every step of the way.
      </p>
    </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panel4'}
            onChange={handleChange('panel4')}
            sx={{ backgroundColor: 'black', color: 'white' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>Risk Management</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              
    <div style={{
      backgroundColor: '#1c1c1e',
      color: '#f1f1f1',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: 'auto',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#FFA500' }}>🚀 Success Starts with Risk Management</h2>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        With <strong>4 years of trading experience</strong> across Forex, Gold, and Crypto markets, the most important lesson I've learned is that without proper <strong>risk management</strong>, it’s impossible to earn consistently.
      </p>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Our top priority is to <strong>safeguard your initial capital</strong>. Our trading course focuses on teaching students how to protect their funds and apply risk-reward ratios of <strong>1:2 or 1:3</strong>—key strategies for sustainable growth.
      </p>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6em' }}>
        Start your journey with us, and learn to manage risk like a pro. With our guidance, you'll build a foundation of safety and control, giving you the best chance for long-term success.
      </p>
    </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
