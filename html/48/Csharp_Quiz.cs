using System.Drawing;

namespace Class48_
{
    internal class Csharp_Quiz
    {
        static void Main(string[] args)
        {
            int index = 1;

            foreach (Colors col in Enum.GetValues(typeof(Colors))) // loop through color enums
            {
                foreach (Patterns patt in Enum.GetValues(typeof(Patterns)))
                {
                    
                    Shirt shirt = new Shirt(col, patt); // create  a new shirt object for each combo

                    Console.WriteLine($"Shirt #{index}: {shirt}"); // call shirt ToString() method.
                    index++; // name the shirts
                }
            }
        }
    }
}
