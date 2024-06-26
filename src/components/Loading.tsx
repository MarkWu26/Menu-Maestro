import Container from "./Container"
import Navbar from "./Navbar"
import SkeletonCard from "./SkeletonCard";

const Loading = () => {
    return (
        <>
        <Navbar />
        <div className="pt-28">
          <Container>
            <div className="flex flex-row justify-between w-full items-center">
              <div className="font-semibold text-slate-800 text-2xl">Menu</div>
            </div>
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-12">
                {Array.from({length: 4}).map((_, index) => (
                    <div key={index}>
                        <SkeletonCard/>
                    </div>
                ))}
            </div>
          </Container>
        </div>
        </>
    )
}

export default Loading