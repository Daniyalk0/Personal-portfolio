
import SelectedWork from './components/Projects'
import AboutSection from './components/About'
import CraftSection from './components/Crafts'
import Hero2 from './components/hero/Hero2'
import { AIAssistant} from './components/chat/AIAssistant'
import Services from './components/Services'
import Footer from './components/Footer'


const page = () => {
  return (
    <div className='overflow-x-hidden'>
    <Hero2/>
    <SelectedWork/>
    <AboutSection/>
    <Services/>
    <CraftSection/>
    <Footer />
   <AIAssistant/>
    </div>
  )
}

export default page