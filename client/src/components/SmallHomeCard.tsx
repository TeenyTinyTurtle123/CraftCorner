import { Card, CardContent, CardFooter } from "./ui/card";
type SmallCardProp = {
  text: string;
  image: string;
};

export function SmallHomeCard({ text, image }: SmallCardProp) {
  return (
    <>
      <Card className="bg-teal-50 w-70 h-64 flex flex-col items-center">
        <CardContent>
          <img
            src={image}
            className="w-60 h-38 object-cover rounded-lg border-2 border-teal-600"
          ></img>
        </CardContent>
        <CardFooter className="font-semibold text-lg">{text}</CardFooter>
      </Card>
    </>
  );
}
