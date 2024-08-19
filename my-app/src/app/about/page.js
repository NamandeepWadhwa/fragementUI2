import Image from "next/image";
export default function Page() {
  return (
    <>
      <div className="flex flex-col  items-center justify-center flex-wrap m-3 ">
        <p className=" text-xl md:text-3xl text-blue-800">About Fragment microservice </p>

        <p className="text-sm md:text-xl text-blue-800 block my-10 w-1/2">
          Welcome to my final project for the course "Cloud Computing for
          Programmers." Throughout this project, I gained valuable new skills,
          which are highlighted below. In essence, this website allows you to
          store any type of data, retrieve it, and even convert it into various
          formats. I utilized AWS to accomplish these features.
        </p>
        <div>
          <h1 className="text-xl md:text-4xl text-blue-800"> Technologies Used/learned</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-around m-5">
        <div className="flex justify-center items-center flex-wrap md:w-1/2">
          <div className="max-h-5/6 max-w-1/2">
            <Image
              src="/AWS.png"
              className="object-cover"
              height={150}
              width={150}
            />
          </div>
        </div>
        <div className="flex justify-start flex-wrap md:w-1/2">
          <h1 className="text-xl text-blue-800 ">
            In this project, I leveraged several AWS services to build a robust
            and scalable application. AWS Cognito was used for user
            authentication and management, ensuring secure access to the
            application. Amazon ECS (Elastic Container Service), in combination
            with ECR (Elastic Container Registry), was utilized to deploy and
            manage Docker containers that run the microservices of the
            application. The actual data, such as files and media, is stored in
            Amazon S3 (Simple Storage Service), providing durable and scalable
            storage. Meanwhile, Amazon DynamoDB is used to store metadata and
            information about the data, enabling fast and efficient querying and
            retrieval. Together, these technologies ensure a secure, scalable,
            and efficient system for storing and managing data.
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-around m-5 transition-all delay-300">
        <div className="flex justify-center items-center flex-wrap md:w-1/2">
          <div className="max-h-5/6 max-w-1/2">
            <Image
              src="/docker.png"
              className="object-cover"
              height={150}
              width={150}
            />
          </div>
        </div>
        <div className="flex justify-start flex-wrap md:w-1/2">
          <h1 className="text-xl text-blue-800 ">
            In this project, Docker played a crucial role in containerizing the
            application, ensuring consistency across different environments. I
            set up a CI/CD pipeline using GitHub Actions to automate the
            testing, building, and deployment processes. The CI workflow
            automatically checks that all unit and integration tests pass before
            pushing the Docker image to the registry. For the CD pipeline, the
            image is pushed to Amazon ECR (Elastic Container Registry) and then
            a new task definition is started in ECS (Elastic Container Service).
            This automation ensures that each deployment is reliable and
            consistent with the codebase.
          </h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-around m-5 transition-all delay-300">
        <div className="flex justify-center items-center flex-wrap md:w-1/2">
          <div className="max-h-5/6 max-w-1/2">
            <Image
              src="/jest.png"
              className="object-cover"
              height={150}
              width={150}
            />
          </div>
        </div>
        <div className="flex justify-start flex-wrap md:w-1/2">
          <h1 className="text-xl text-blue-800 ">
            To ensure the reliability of the application, I implemented
            comprehensive testing using Jest and Hurl. Jest was used for unit
            testing, achieving 90% coverage to verify that individual components
            functioned correctly. For integration testing, Hurl was employed to
            test HTTP requests and responses, ensuring seamless interaction
            between microservices and API endpoints. This combined approach
            helped maintain high code quality and system integrity.
          </h1>
        </div>
      </div>
    </>
  );
}