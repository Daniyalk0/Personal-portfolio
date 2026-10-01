
import SelectedWork from './components/Projects'
import AboutSection from './components/About'
import CraftSection from './components/Crafts'
import Hero2 from './components/hero/Hero2'
import { AIAssistant} from './components/chat/AIAssistant'


const page = () => {
  return (
    <div className="overflow-hidden">
    <Hero2/>
    <SelectedWork/>
    <AboutSection/>
    <CraftSection/>
   <AIAssistant/>
    </div>
  )
}

export default page