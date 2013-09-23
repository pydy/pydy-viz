Basic Tutorial
--------------

In this tutorial, we are going to analyze a mass spring damper problem, and animate it using the package.
For this tutorial to work, you have following additional dependency:

 * Scipy_
 
We are going to break this tutorial into three parts, 
 * Mechanics Part: where we define the system and derive Equations Of Motion.
 * Simulation Part: where we numerically solve Equations of Motion(using SciPy).
 * Visualization Part: where we actually generate the animations in a browser.
 


Equation Of Motion Generation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

We will be using SymPy Mechanics module for EoM generation.

For more details on Mechanics Please refer to SymPy docs and tutorials.

First we import necessary functionality from SymPy::

    >>> from sympy.physics.mechanics import *
    >>> from sympy import symbols,cos,Eq,sqrt,sin

Now, we will create some symbols for coordinates, speed, force etc of the mass(bob).

    >>> q = dynamicsymbols('q')                # Generalized coordinate
    >>> u = dynamicsymbols('u')                # Generalized speed
    >>> f = dynamicsymbols('f')                # Net Force applied to the box
    >>> m = symbols('m')                       # Mass of body
    >>> g, k, t, L = symbols('g k t L')        # Gravity,spring constant, time and length of unstretched spring
    
    
Now we create an inertial reference frame, assign an origin, and set origin velocity to zero.

    >>> I = ReferenceFrame('I')            # Inertial reference frame
    >>> O = Point('O')                     # Origin point
    >>> O.set_vel(I, 0)                    # Origin's velocity is zero
    
Now we define the bob as a Particle.

    >>> P = Point('P')                      # Center Of Mass of the box
    >>> P.set_pos(O, q * I.y)               # Set the position of P
    >>> P.set_vel(I, u * I.y )              # Set the velocity of P
    >>> bob = Particle('bob',P,m)   
    
We assign forces acting on the Particle. Coordinate axes are defined to be as : 
    * x-axis: running from left to right, 
    * y-axis: running from top to bottom,
    * z-axis: running from behind the plane to above the plane.
    
Following the above notion, Gravity is taken to be in (+I.y) direction, 
and force due to spring(F=Kx), in -I.y direction.

    >>> f = m*g* I.y - k*(q)*I.y    #Net force on bob.
    >>> force = [(P,f)]    

Setting up equation of motion for the body::

    >>> diff_eq = [q.diff(t) - u]
    
    
    


Advanced Tutorial 
-----------------








.. _Scipy: http://www.scipy.org

