using System;
using System.Collections.Generic;
using System.Text;

namespace Class48_
{
    public enum Colors { 
        Yellow,
        Black,
        White
    }

    public enum Patterns
    {
        Striped,
        Checked,
        Plain
    }

    internal class Shirt
    {
        public Colors Color { get; }
        public Patterns Pattern { get;}


        public Shirt(Colors color, Patterns pattern) // ctor
        {
            Color = color;
            Pattern = pattern;
        }

        public override string ToString() // overwrites the ToString() method to print colors/patterns when calling print on Shirts
        {
            return $"{Color}, {Pattern}";
        }


    }
}
